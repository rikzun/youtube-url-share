import "./App.css"
import githubLogoUrl from "@/public/github.svg?url"
import { Storage } from "@/storage"
import { Field } from "@/components/Field"

export interface Store {
    keepTimestamp: boolean
    keepList: boolean
    keepShareFeature: boolean
    replaceShare: boolean
}

export function App() {
    const store = createStore<Store>({
        keepTimestamp: true,
        keepList: false,
        keepShareFeature: false,
        replaceShare: true
    })

    onMount(async() => {
        const keepTimestamp = await Storage.keepTimestamp.getValue()
        const keepList = await Storage.keepList.getValue()
        const keepShareFeature = await Storage.keepShareFeature.getValue()
        const replaceShare = await Storage.replaceShare.getValue()

        store[1]({
            keepTimestamp,
            keepList,
            keepShareFeature,
            replaceShare
        })
    })

    return (
        <>
            <div class="title">
                Youtube URL Share

                <a
                    class="github-link"
                    href="https://github.com/rikzun/youtube-url-share"
                    target="_blank"
                    children={
                        <img
                            class="github-logo"
                            src={githubLogoUrl}
                            alt="github logo"
                        />
                    }
                />
            </div>

            <div class="fields">
                <Field label="Keep Timestamp"       key="keepTimestamp"    store={store} />
                <Field label="Keep List"            key="keepList"         store={store} />
                <Field label="Keep Share Feature"   key="keepShareFeature" store={store} />
                <Field label="Replace Share button" key="replaceShare"     store={store} />
            </div>
        </>
    )
}
