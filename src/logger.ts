const canUseConsole = typeof console == 'object'

let isEnabled = true

export function toggleLogError(value: boolean) {
  isEnabled = value
}

export function logError(...args: unknown[]) {
  if (!isEnabled) return
  if (!canUseConsole) return
  console.error('#translate:', ...args)
}
