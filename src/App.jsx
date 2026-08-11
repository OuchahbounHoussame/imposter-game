import React, { useState, useEffect, useRef } from "react";
import { COLORS, DISPLAY_FONT, BODY_FONT, CATEGORIES, CAT_NAMES } from "./components/constants";
import { randInt, shuffle } from "./components/helpers";
import LeaderboardModal from "./components/LeaderboardModal";
import SetupPhase from "./components/SetupPhase";
import PassingPhase from "./components/PassingPhase";
import DiscussPhase from "./components/DiscussPhase";
import VotingPhase from "./components/VotingPhase";
import VotingDonePhase from "./components/VotingDonePhase";
import ImpostorGuessPhase from "./components/ImpostorGuessPhase";
import FinalPhase from "./components/FinalPhase";

export default function App() {
  const [phase, setPhase] = useState("setup");
  // setup | passing | discuss | voting | votingDone | impostorGuess | final

  const [playerCount, setPlayerCount] = useState(5);
  const [names, setNames] = useState(["", "", "", "", ""]);
  const [category, setCategory] = useState("عشوائي");
  const [word, setWord] = useState("");
  const [catUsed, setCatUsed] = useState("");
  const [impostorIndex, setImpostorIndex] = useState(0);

  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  const [seconds, setSeconds] = useState(180);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const [voterIndex, setVoterIndex] = useState(0);
  const [votes, setVotes] = useState([]);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [votingRevealed, setVotingRevealed] = useState(false);

  const [guessOptions, setGuessOptions] = useState([]);
  const [guessPicked, setGuessPicked] = useState(null);

  useEffect(() => {
    setNames((prev) => {
      const arr = [...prev];
      while (arr.length < playerCount) arr.push("");
      return arr.slice(0, playerCount);
    });
    setScores((prev) => {
      const arr = [...prev];
      while (arr.length < playerCount) arr.push(0);
      return arr.slice(0, playerCount);
    });
  }, [playerCount]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) return 0;
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (seconds === 0 && running) {
      setRunning(false);
    }
  }, [seconds, running]);

  function startGame() {
    const chosenCat = category === "عشوائي" ? CAT_NAMES[randInt(CAT_NAMES.length)] : category;
    const list = CATEGORIES[chosenCat];
    const chosenWord = list[randInt(list.length)];
    const imp = randInt(playerCount);
    setCatUsed(chosenCat);
    setWord(chosenWord);
    setImpostorIndex(imp);
    setCurrent(0);
    setFlipped(false);
    setAdvancing(false);
    setSeconds(180);
    setRunning(false);
    setVoterIndex(0);
    setVotes(Array(playerCount).fill(null));
    setVoteConfirmed(false);
    setVotingRevealed(false);
    setGuessPicked(null);
    setPhase("passing");
  }

  function playerLabel(i) {
    const rawName = names[i] && names[i].trim() ? names[i].trim() : `اللاعب ${i + 1}`;
    // Check for duplicates to avoid confusion
    const isDuplicate = names.some((n, idx) => idx !== i && n.trim() === rawName);
    return isDuplicate ? `${rawName} (${i + 1})` : rawName;
  }

  function handleReveal() {
    setFlipped(true);
  }

  function handleNext() {
    setFlipped(false);
    setAdvancing(true);
    setTimeout(() => {
      setAdvancing(false);
      if (current + 1 < playerCount) {
        setCurrent((c) => c + 1);
      } else {
        setPhase("discuss");
      }
    }, 650);
  }

  function fmtTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function goToVoting() {
    setRunning(false);
    setVoterIndex(0);
    setVotes(Array(playerCount).fill(null));
    setVoteConfirmed(false);
    setVotingRevealed(false);
    setPhase("voting");
  }

  function castVote(suspectIdx) {
    const arr = [...votes];
    arr[voterIndex] = suspectIdx;
    setVotes(arr);
    setVoteConfirmed(true);
  }

  function nextVoter() {
    setVoteConfirmed(false);
    if (voterIndex + 1 < playerCount) {
      setVoterIndex((v) => v + 1);
    } else {
      setPhase("votingDone");
    }
  }

  function revealImpostor() {
    const updated = [...scores];
    votes.forEach((v, voter) => {
      if (v === impostorIndex) updated[voter] += 1;
    });
    setScores(updated);
    setVotingRevealed(true);
  }

  function goToImpostorGuess() {
    const list = CATEGORIES[catUsed].filter((w) => w !== word);
    const decoys = shuffle(list).slice(0, 7);
    setGuessOptions(shuffle([word, ...decoys]));
    setGuessPicked(null);
    setPhase("impostorGuess");
  }

  function pickGuess(w) {
    if (guessPicked) return;
    setGuessPicked(w);
    if (w === word) {
      const updated = [...scores];
      updated[impostorIndex] += 1;
      setScores(updated);
    }
  }

  function resetRound() {
    setPhase("setup");
    setRunning(false);
    clearInterval(intervalRef.current);
  }

  function resetScores() {
    setScores(Array(playerCount).fill(0));
  }

  function sortedIdx() {
    return Array.from({ length: playerCount })
      .map((_, i) => i)
      .sort((a, b) => scores[b] - scores[a]);
  }

  const showLbButton = phase !== "setup" && phase !== "passing";

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: `radial-gradient(1200px 600px at 50% -10%, ${COLORS.panel}, ${COLORS.ink})`,
        fontFamily: BODY_FONT,
        color: COLORS.cream,
        position: "relative",
      }}
      className="flex items-center justify-center p-4"
    >
      {/* Leaderboard toggle */}
      {showLbButton && (
        <button
          onClick={() => setShowLeaderboard(true)}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: COLORS.panelSoft,
            border: `1px solid ${COLORS.gold}`,
            color: COLORS.goldSoft,
            borderRadius: 20,
            padding: "6px 14px",
            fontSize: 12,
            cursor: "pointer",
            zIndex: 20,
          }}
        >
          الترتيب
        </button>
      )}

      {/* Leaderboard modal */}
      {showLeaderboard && (
        <LeaderboardModal
          setShowLeaderboard={setShowLeaderboard}
          sortedIdx={sortedIdx}
          playerLabel={playerLabel}
          scores={scores}
        />
      )}

      <div style={{ width: "95%", maxWidth: "min(440px, 95vw)", margin: "0 auto" }}>
        <div className="text-center mb-6">
          <div
            style={{
              fontFamily: DISPLAY_FONT,
              color: COLORS.gold,
              fontSize: 34,
              letterSpacing: 1,
              textShadow: "0 2px 12px rgba(201,161,90,0.25)",
            }}
          >
            الغريب
          </div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 2 }}>
            ملف سري &middot; لعبة الكلمة المخفية
          </div>
        </div>

        {/* ---- SETUP ---- */}
        {phase === "setup" && (
          <SetupPhase
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            names={names}
            setNames={setNames}
            category={category}
            setCategory={setCategory}
            startGame={startGame}
            scores={scores}
            resetScores={resetScores}
          />
        )}

        {/* ---- PASSING / REVEAL ---- */}
        {phase === "passing" && (
          <PassingPhase
            current={current}
            playerCount={playerCount}
            playerLabel={playerLabel}
            flipped={flipped}
            advancing={advancing}
            handleReveal={handleReveal}
            handleNext={handleNext}
            impostorIndex={impostorIndex}
            catUsed={catUsed}
            word={word}
          />
        )}

        {/* ---- DISCUSS / TIMER ---- */}
        {phase === "discuss" && (
          <DiscussPhase
            seconds={seconds}
            setSeconds={setSeconds}
            running={running}
            setRunning={setRunning}
            fmtTime={fmtTime}
            goToVoting={goToVoting}
          />
        )}

        {/* ---- VOTING ---- */}
        {phase === "voting" && (
          <VotingPhase
            voterIndex={voterIndex}
            playerCount={playerCount}
            playerLabel={playerLabel}
            voteConfirmed={voteConfirmed}
            castVote={castVote}
            nextVoter={nextVoter}
          />
        )}

        {/* ---- VOTING DONE / REVEAL IMPOSTOR ---- */}
        {phase === "votingDone" && (
          <VotingDonePhase
            votingRevealed={votingRevealed}
            revealImpostor={revealImpostor}
            impostorIndex={impostorIndex}
            playerLabel={playerLabel}
            votes={votes}
            goToImpostorGuess={goToImpostorGuess}
          />
        )}

        {/* ---- IMPOSTOR GUESS ---- */}
        {phase === "impostorGuess" && (
          <ImpostorGuessPhase
            impostorIndex={impostorIndex}
            playerLabel={playerLabel}
            guessOptions={guessOptions}
            guessPicked={guessPicked}
            pickGuess={pickGuess}
            word={word}
            setPhase={setPhase}
          />
        )}

        {/* ---- FINAL ---- */}
        {phase === "final" && (
          <FinalPhase
            catUsed={catUsed}
            word={word}
            impostorIndex={impostorIndex}
            playerLabel={playerLabel}
            sortedIdx={sortedIdx}
            scores={scores}
            resetRound={resetRound}
          />
        )}
      </div>
    </div>
  );
}
