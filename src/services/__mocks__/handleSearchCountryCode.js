
const fakeData = [
    {
        alpha2Code:'AU',
        name:'Australia'
    }
]

export default async value => {
    const response = await new Promise((resolve => {
        resolve(fakeData)
    }))
    return response
}