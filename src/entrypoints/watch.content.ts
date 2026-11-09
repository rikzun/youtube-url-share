import { Storage } from "@/storage"
import { globalCopyEventListener, globalShareButtonListener } from "@/global"

const FINAL_URL = "https://youtu.be/"

const COPY_PATTERNS_START = [
    "https://www.youtu.be/",
    "https://youtu.be/",
    "https://www.youtube.com/",
    "https://youtube.com/"
] as const

async function copyLink(origin: string | null = null) {
    const keepTimestamp = await Storage.keepTimestamp.getValue()
    const keepList = await Storage.keepList.getValue()

    // share button      https://youtu.be/###?si=###
    // contextmenu share https://youtu.be/###?t=0
    // url               https://www.youtube.com/watch?v=###&list=###&start_radio=1
    const url = new URL(origin ?? location.href)

    let id = url.searchParams.get("v")
    if (!id) {
        const parts = url.pathname.split("/")
        id = parts[parts.length - 1] ?? null
    }

    const final = new URL(FINAL_URL + id)

    if (keepList) {
        const list = url.searchParams.get("list")
        
        if (list) {
            final.searchParams.set("list", list)
        }
    }

    if (keepTimestamp) {
        const timestamp = url.searchParams.get("t")

        if (timestamp) {
            final.searchParams.set("t", timestamp)
        }
    }

    navigator.clipboard.writeText(final.toString())
}

export default defineContentScript({
    matches: [
        "*://www.youtube.com/watch*",
        "*://youtube.com/watch*",
        "*://youtu.be/*"
    ],
    
    main: () => {
        Storage.replaceShare.getValue().then((replace) => {
            if (!replace) return

            globalShareButtonListener(copyLink)
        })

        globalCopyEventListener(COPY_PATTERNS_START, copyLink)
    }
})