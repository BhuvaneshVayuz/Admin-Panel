export const dispatchAsyncLoader = async (dispatch, func, paramArr, setLoading) => {
    setLoading(true)
    let res
    if (paramArr.length > 0) {
        res = await dispatch(func(...paramArr))
    } else {
        res = await dispatch(func())
    }
    setLoading(false)
    return res.payload
}