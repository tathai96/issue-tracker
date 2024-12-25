'use client'
import 'easymde/dist/easymde.min.css';
import dynamic from "next/dynamic";

interface Props {
    placeholder: string;
}

const SimpleMdeEditor = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
)
const Editor = ({placeholder}: Props) => {
    return (
        <SimpleMdeEditor placeholder={placeholder} />
    )
}

export default Editor;