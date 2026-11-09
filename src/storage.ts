export namespace Storage {
    export const keepTimestamp = storage.defineItem<boolean>(
        "sync:keepTimestamp",
        { defaultValue: true }
    )

    export const keepList = storage.defineItem<boolean>(
        "sync:keepList",
        { defaultValue: false }
    )

    export const keepShareFeature = storage.defineItem<boolean>(
        "sync:keepShareFeature",
        { defaultValue: false }
    )

    export const replaceShare = storage.defineItem<boolean>(
        "sync:replaceShare",
        { defaultValue: true }
    )
}
