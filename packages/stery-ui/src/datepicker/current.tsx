type CurrentStates = {
    month?: string
    year?: number
    day?: number
    title?: string
}
type CurrentProps = {
    children: (state: CurrentStates) => React.ReactNode
} & CurrentStates

export default function Current(e: CurrentProps) : React.ReactNode | JSX.Element {
    let props = {
        ...e,
        title: 'current'
    }
    return e.children(props)
}