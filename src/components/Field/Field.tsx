import "./Field.css"
import type { Store } from "@/entrypoints/popup/App"
import type { StoreReturn } from "solid-js/store"
import { Checkbox } from "../Checkbox"
import { Storage } from "@/storage"

interface FieldProps {
    label: string
    key: keyof Store
    store: StoreReturn<Store>
}

export function Field(props: FieldProps) {
    return (
        <div class="field">
            <Checkbox
                checked={props.store[0][props.key]}
                onChange={(v) => {
                    props.store[1](props.key, v)
                    Storage[props.key].setValue(v)
                }}
            />
            
            <span>{props.label}</span>
        </div>
    )
}