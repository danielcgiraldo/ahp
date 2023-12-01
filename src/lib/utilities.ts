export const ConvertToMoney = (value: number) => {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "COP",
    });
}