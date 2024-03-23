export const graphQLCommand = async (query, variables) => {
  try {
    const response = await fetch('http://localhost:3002/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: variables
        ? JSON.stringify({ query, variables })
        : JSON.stringify({ query }),
    })

    if (response.ok) {
      const result = await response.json()
      return result.data
    } else {
      console.log('Error in sending data to server', response.statusText)
    }
  } catch (error) {
    console.log('Error', error)
  }
}
