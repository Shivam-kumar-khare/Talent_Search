import React from 'react'
import { NavBar } from '../components'
import { PROBLEMS } from '../data/problem.js'
import { ProblemCard } from '../components'

function ProblemsPage() {

  const problems = Object.values(PROBLEMS)

  let mediumProblemsCount = 0, hardProblemsCount = 0, easyProblemsCount = 0;

  problems.forEach((problem) => {
    switch (problem.difficulty.toLowerCase()) {
      case "easy":
        easyProblemsCount++; break;
      case "medium":
        mediumProblemsCount++; break;
      case "hard":
        hardProblemsCount++; break;
      default:
        break;
    }
  })

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-12">



        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
        </div>



        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {problems.map((problem) =>
            <ProblemCard
              key={problem.id}
              problemId={problem.id}
              problemTitle={problem.title}
              problemDifficulty={problem.difficulty}
              problemCategory={problem.category}
              problemDescriptionText={problem.description.text}


            />
          )}
        </div>
        {/* Stats Footer */}
        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">{easyProblemsCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumProblemsCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblemsCount}</div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ProblemsPage