import React, { useState, useEffect } from 'react';

function DraftPage() {
  const [draftYear, setDraftYear] = useState('')
  const [fullDraft, setFullDraft] = useState([])
  const [round, setRound] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://statsapi.web.nhl.com/api/v1/draft')
        const data = await response.json();

        const dataDraftYear = data.drafts[0].draftYear;
        const dataFullDraft = data.drafts[0].rounds;

        console.log(dataFullDraft)
        setDraftYear(dataDraftYear)
        setFullDraft(dataFullDraft)
      } catch (error) {
        console.error('Error fetching NHL data');
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setRound(event.target.value)
  }

  return (
    <div>
      <h1>Draft {draftYear}</h1>
      <select id="round-select" onChange={handleChange}>
        {fullDraft.map((round, index) => (
          <option key={index} value={index + 1}>Round {index + 1}</option>
        ))}
      </select>
      <div className = "flex flex-wrap margin-lr-10 margin-tb-3">
        {fullDraft[round - 1]?.picks.map((pick, index) => (
          <div key={index} className="width-12">
            <p>{pick.pickOverall} - {pick.prospect.fullName}</p>
            <p>{pick.team.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DraftPage;