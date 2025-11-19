export function formatTimeNum(t: number): string {
    return Math.round(t).toString().padStart(2, '0')
}
