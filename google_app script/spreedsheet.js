function findWinner() {
    const ss = SpreadsheetApp.openByUrl("spread-sheet-link");
    const sheet = ss.getSheets()[0];
    const values = sheet.getSheetValues(2, 1, 72, 9 );
    const rankValues = [
      {
        name: 'name',
        value: 0
      },
      {
        name: 'post',
        value: 5
      },
      {
        name: 'comment',
        value: 5
      },
      {
        name: 'react',
        value: 1
      },
      {
        name: 'post-approved',
        value: 3
      },
      {
        name: 'post-declined',
        value: 3
      },
      {
        name: 'post-removed',
        value: 3
      },
      {
        name: 'request-appoved',
        value: 1
      },
      {
        name: 'request-declined',
        value: 1
      },
    ]
  
    const users = values.reduce((acc, row) => {
      const name = row[0]
      const user = {name}
  
      let total = row.reduce((result, col, index) => {
        if (index !== 0)  {
          const rank = rankValues[index];
          const totalRank = col * rank.value;
          result += totalRank
          user[rank.name] = totalRank
        }
        return result
      }, 0)
  
      user.total = total
      acc.push(user)
      return acc;
    }, []).sort((a, b) => b.total - a.total)
    
    const drive = DriveApp.getRootFolder()
    drive.createFile('moderators-rank-list.json', JSON.stringify(users), 'application/json')
    console.log(drive.getName())
  }