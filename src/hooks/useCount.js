const fetchDetails = async (UsrName) => {
  try {
    const res = await fetch(`https://api.github.com/search/issues?q=is:pr+author:${UsrName}+type:pr&per_page=100&labels=true`)
    if (!res.ok) throw new Error("Error")
    const data = await res.json()
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

const ParentDetails = async (api) => {
  try {
    const res = await fetch(api)
    if (!res.ok) throw new Error("Error")
    const data = await res.json()
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getCount = async (UsrName) => {
  try {
    const data = await fetchDetails(UsrName);
    let cnt = 0;

    for (const item of data.items) {
      const newLink = item.repository_url;
      const closedPrDate = new Date(item.closed_at);

      // Check if PR was closed in October 2023
      if (closedPrDate.getMonth() === 9 && closedPrDate.getFullYear() === 2023) {
        const repoData = await ParentDetails(newLink);

        for (const topic of repoData.topics) {
          if (topic === 'hacktoberfest') {
            cnt++;
          }
        }
      }
    }

    return cnt;
  } catch (error) {
    console.error(error);
    return 0;
  }
};


export const getAcceptedCount = async (UsrName) => {
  try {
    const data = await fetchDetails(UsrName);
    let cntAcc = 0;
    // console.log(data);
    for (const item of data.items) {
      const closedPrDate = new Date(item.closed_at);
      if (closedPrDate.getMonth() === 9 && closedPrDate.getFullYear() === 2023) {
        item.labels.forEach(label => {
          if (label.name === 'hacktoberfest-accepted') {
            cntAcc++;
          }
        });
      }
    }
    // console.log(`Total count of "hacktoberfest-accepted": ${cntAcc}`);
    return cntAcc;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
