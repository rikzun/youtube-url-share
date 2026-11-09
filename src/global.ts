const shareIconPath = "M10 3.158V7.51c-5.428.223-8.27 3.75-8.875 11.199-.04.487-.07.975-.09 1.464l-.014.395c-.014.473.578.684.88.32.302-.368.61-.73.925-1.086l.244-.273c1.79-1.967 3-2.677 4.93-2.917a18.011 18.011 0 012-.112v4.346a1 1 0 001.646.763l9.805-8.297 1.55-1.31-1.55-1.31-9.805-8.297A1 1 0 0010 3.158Zm2 6.27v.002-4.116l7.904 6.688L12 18.689v-4.212l-2.023.024c-1.935.022-3.587.17-5.197 1.024a9 9 0 00-1.348.893c.355-1.947.916-3.39 1.63-4.425 1.062-1.541 2.607-2.385 5.02-2.485L12 9.428Z"

export function globalShareButtonListener(onClick: () => Promise<any>) {
    document.addEventListener("click", (e) => {
        if (!(e.target instanceof Element)) return

        const button = e.target?.closest("button")
        if (!button) return

        const path = button.querySelector(`path[d="${shareIconPath}"]`)
        if (!path) return

        e.preventDefault()
        e.stopPropagation()

        onClick().then(() => {
            button.style.backgroundColor = "green"
            button.style.transition = "background-color 300ms ease-out"

            setTimeout(() => {
                button.style.backgroundColor = ""
                button.style.transition = "background-color 200ms ease-in-out"
            }, 500)
        })
    }, { capture: true })
}

export function globalCopyEventListener(patterns: readonly string[], cb: (origin: string) => Promise<any>) {
    document.addEventListener("copy", (e) => {
        const value = window.getSelection()?.toString()
        if (!value) return

        const matches = patterns.some((v) => value.startsWith(v))
        if (!matches) return

        e.preventDefault()
        cb(value)
    })
}
