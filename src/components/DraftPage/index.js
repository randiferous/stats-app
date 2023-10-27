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
        const dataFullDraft = data.drafts[0].rounds[round-1];

        for (let i = 0; i < dataFullDraft.picks.length; i++) {
          const prospectResponse = await fetch(`https://statsapi.web.nhl.com${dataFullDraft.picks[i].prospect.link}`)
          const prospectData = await prospectResponse.json();
          dataFullDraft.picks[i].position = prospectData.prospects[0].primaryPosition.abbreviation
        }
        
        setDraftYear(dataDraftYear)
        setFullDraft(dataFullDraft)
      } catch (error) {
        console.error('Error fetching NHL data');
      }
    };

    fetchData();
  }, [round]);

  const handleChange = (event) => {
    setRound(event.target.value)
  }

  return (
    <div>
      <h1>Draft {draftYear}</h1>
      <select id="round-select" onChange={handleChange}>
            <option key={0} value={1}>Round 1</option>
            <option key={1} value={2}>Round 2</option>
            <option key={2} value={3}>Round 3</option>
            <option key={3} value={4}>Round 4</option>
            <option key={4} value={5}>Round 5</option>
            <option key={5} value={6}>Round 6</option>
            <option key={6} value={7}>Round 7</option>
      </select>
      <h2 className="margin-t-3">Round {round}</h2>
      <div className = "flex flex-wrap margin-lr-10 margin-b-3 ">
        {fullDraft?.picks?.map((pick, index) => (
          <div key={index} className="width-12 black-border">
            <p><b>{pick.pickOverall}.</b> {pick.prospect.fullName} - {pick.position}</p>
            <p>{pick.team.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DraftPage;