export default function setDelay(delay: number) {
  return new Promise<void>((res) => setTimeout(res, delay));
}
