import { Storage } from "@/storage"
import { globalCopyEventListener, globalShareButtonListener } from "@/global"

const FINAL_URL = "https://youtube.com/shorts/"

const COPY_PATTERNS_START = [
    "https://www.youtube.com/shorts/",
    "https://youtube.com/shorts/",
] as const

async function copyLink(origin: string | null = null) {
    const keepTimestamp = await Storage.keepTimestamp.getValue()
    const keepShareFeature = await Storage.keepShareFeature.getValue()

    // share button      https://youtube.com/shorts/###?si=###
    // contextmenu share https://www.youtube.com/shorts/###?t=0&feature=share
    // url               https://www.youtube.com/shorts/###
    const url = new URL(origin ?? location.href)

    const parts = url.pathname.split("/")
    const id = parts[parts.length - 1]

    const final = new URL(FINAL_URL + id)

    if (keepTimestamp) {
        const timestamp = url.searchParams.get("t")

        if (timestamp) {
            final.searchParams.set("t", timestamp)
        }
    }

    if (keepShareFeature) {
        const isPresent = url.searchParams.has("feature", "share")

        if (isPresent) {
            final.searchParams.set("feature", "share")
        }
    }

    navigator.clipboard.writeText(final.toString())
}

export default defineContentScript({
    matches: [
        "*://www.youtube.com/shorts*",
        "*://youtube.com/shorts*"
    ],
    
    main: () => {
        Storage.replaceShare.getValue().then((replace) => {
            if (!replace) return

            globalShareButtonListener(copyLink)
        })

        globalCopyEventListener(COPY_PATTERNS_START, copyLink)
    }
})
