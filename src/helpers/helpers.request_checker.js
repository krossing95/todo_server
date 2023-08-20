export default function RequestBodyChecker() {
    const isTrueBodyStructure = (expected_payload, body) => {
        const bodyToArray = Object.keys(body)
        if (expected_payload.length !== bodyToArray.length) return false
        const sortedPayload = bodyToArray.slice().sort()
        const sortedExpectedPayload = expected_payload.slice().sort()
        return sortedPayload.every((item, i) => item === sortedExpectedPayload[i])
    }
    return {
        isTrueBodyStructure
    }
}