import {Button, TextField} from "@radix-ui/themes";
import Editor from "@/app/components/Editor";

const NewIssuePage = () => {
    return (
        <div className={"max-w-xl space-y-3"}>
            <TextField.Root placeholder={"Enter a new issue"} >
            </TextField.Root>
            <Editor placeholder={'Description'} />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage