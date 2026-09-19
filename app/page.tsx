"use client";

import Link from "next/link";
import { useState } from "react";
import { getGhost, ghosts, questions, type GhostCode } from "@/lib/ghosts";
import { formatShareText, scoreAnswers } from "@/lib/scoring";

type QuizState = "start" | "in-quiz" | "result";

export default function Home() {
  const [state, setState] = useState<QuizState>("start");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<GhostCode[]>([]);
  const [showAllGhosts, setShowAllGhosts] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  const currentQuestion = questions[questionIndex];
  const result = state === "result" ? getGhost(scoreAnswers(answers)) : null;

  const answerQuestion = (code: GhostCode) => {
    const nextAnswers = [...answers, code];
    setAnswers(nextAnswers);
    setShareStatus("");

    if (nextAnswers.length === questions.length) {
      setState("result");
      return;
    }

    setQuestionIndex((index) => index + 1);
  };

  const restartQuiz = () => {
    setState("in-quiz");
    setQuestionIndex(0);
    setAnswers([]);
    setShareStatus("");
  };

  const copyShareText = async () => {
    if (!result) {
      return;
    }

    const shareText = formatShareText(result.code, result.name, result.title);
    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus("Copied — now go haunt the group chat.");
    } catch {
      setShareStatus("Clipboard unavailable. Copy the share line below.");
    }
  };

  return (
    <main className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <section className="quiz-frame" aria-live="polite">
        {state === "start" && (
          <div className="screen start-screen">
            <div className="eyebrow">A self-roast personality quiz</div>
            <h1>What Kind Of<br />Corporate Ghost<br />Are You?</h1>
            <p className="start-copy">
              Eight slippery-slope questions. One haunted work style. No
              recovery plan included.
            </p>
            <button className="primary-button start-button" type="button" onClick={() => setState("in-quiz")}>
              Begin the haunting <span aria-hidden="true">→</span>
            </button>
            <p className="tiny-note">Deterministic scoring. Zero AI. All offline.</p>
          </div>
        )}

        {state === "in-quiz" && currentQuestion && (
          <div className="screen quiz-screen">
            <div className="quiz-header">
              <div>
                <div className="eyebrow">Corporate Ghost Diagnostic</div>
                <h2>Question {questionIndex + 1} <span>/ {questions.length}</span></h2>
              </div>
              <div className="progress-copy">{questionIndex + 1} of {questions.length}</div>
            </div>
            <div className="progress-track" aria-label="Quiz progress">
              <div className="progress-fill" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
            </div>
            <p className="question-prompt">{currentQuestion.prompt}</p>
            <div className="option-grid">
              {currentQuestion.options.map((option) => (
                <button className="option-card" key={option.text} type="button" onClick={() => answerQuestion(option.ghost)}>
                  <span className="option-mark" aria-hidden="true">✦</span>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
            <p className="quiz-hint">Tap an option to continue. No going back. Naturally.</p>
          </div>
        )}

        {state === "result" && result && (
          <div className="screen result-screen">
            <div className="result-card">
              <div className="result-topline">
                <span className="result-kicker">Your corporate ghost</span>
                <span className="result-code">{result.code}</span>
              </div>
              <img className="result-image" src={result.image} alt={result.name} width={512} height={512} />
              <h2>{result.name}</h2>
              <p className="result-title">{result.title}</p>
              <p className="result-hook">“{result.short}”</p>
              <p className="result-description">{result.description}</p>
              <div className="result-details">
                <div>
                  <span className="detail-label">Strengths</span>
                  <ul>{result.strengths.map((strength) => <li key={strength}>{strength}</li>)}</ul>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Friday ritual</span>
                  <p>{result.ritual}</p>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Sunday haunt</span>
                  <p>{result.haunt}</p>
                </div>
              </div>
              <div className="share-block">
                <button className="primary-button share-button" type="button" onClick={copyShareText}>
                  Copy share line <span aria-hidden="true">⧉</span>
                </button>
                <p className="share-status" aria-live="polite">{shareStatus || "Screenshot this card. It knows what you did."}</p>
                <p className="share-line">{formatShareText(result.code, result.name, result.title)}</p>
              </div>
            </div>
            <div className="result-actions">
              <button className="secondary-button" type="button" onClick={restartQuiz}>Take again <span aria-hidden="true">↻</span></button>
              <button className="text-button" type="button" onClick={() => setShowAllGhosts((isOpen) => !isOpen)} aria-expanded={showAllGhosts}>
                {showAllGhosts ? "Hide all 8 types" : "See all 8 types"} <span aria-hidden="true">{showAllGhosts ? "↑" : "↓"}</span>
              </button>
            </div>
            {showAllGhosts && (
              <div className="ghost-index">
                <div className="ghost-index-heading">
                  <span className="eyebrow">The full haunting</span>
                  <h3>Choose your poison</h3>
                </div>
                <div className="ghost-index-grid">
                  {ghosts.map((ghost) => (
                    <Link className="ghost-index-item" key={ghost.code} href={`/result/${ghost.code}`}>
                      <img className="ghost-index-image" src={ghost.image} alt={ghost.name} width={512} height={512} loading="lazy" />
                      <div><strong>{ghost.code}</strong><p>{ghost.name}</p></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      <footer className="app-footer">Corporate Ghost Quiz <span>·</span> a tiny office seance</footer>
    </main>
  );
}
