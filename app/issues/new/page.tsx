import {Button, TextArea, TextField} from "@radix-ui/themes";

const NewIssuePage = () => {
    return (
        <div className={"max-w-xl space-y-3"}>
            <TextField.Root placeholder={"Enter a new issue"} >
            </TextField.Root>
            <TextArea placeholder="Reply to comment…" />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage