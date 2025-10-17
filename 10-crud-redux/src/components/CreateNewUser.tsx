import {Button, Card, CardHeader, TextField} from '@mui/material';
import {useUserActions} from "../hooks/useUserActions.ts";

export const CreateNewUser = () => {
    const {addUser} = useUserActions();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formaData = new FormData(form);

        const name = formaData.get('name') as string;
        const email = formaData.get('email') as string;
        const github = formaData.get('github') as string;

        addUser({name, email, github});
        form.reset();
    }
    return (
        <Card className="mt-4 p-0">
            <CardHeader title="Create New User"/>
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column gap-2 p-2">
                    <TextField name="name" label="Nombre" variant="outlined" placeholder="Nombre"/>
                    <TextField name="email" label="Correo" variant="outlined" placeholder="Correo"/>
                    <TextField name="github" label="Usuario github" variant="outlined" placeholder="Usuario github"/>
                </div>
                <div className="mb-2">
                    <Button type="submit" style={{marginTop: '16px'}} variant="contained">Crear usuario</Button>
                </div>
            </form>
        </Card>
    )
}