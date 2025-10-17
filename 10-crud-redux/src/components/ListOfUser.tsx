import {
    Card,
    CardContent,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    IconButton,
    Box,
    Badge,
    styled
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {useAppSelector} from "../hooks/useStore.ts";
import {useUserActions} from "../hooks/useUserActions.ts";

const StyledBadge = styled(Badge)(({theme}) => ({
    "& .MuiBadge-badge": {
        right: -5,
        top: 6,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));


export const ListOfUser = () => {
    const users = useAppSelector((state) => state.users);
    const {removeUser} = useUserActions();

    return (
        <Card sx={{maxWidth: 900, mx: "auto", mt: 4, boxShadow: 3}}>
            <CardContent>
                <StyledBadge color="primary" badgeContent={users.length}>
                    <Typography variant="h6" gutterBottom>
                        Lista de Usuarios
                    </Typography>
                </StyledBadge>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    <Box className="d-flex align-items-center gap-2">
                                        <img
                                            src={`https://unavatar.io/${user.github}`}
                                            width={32}
                                            height={32}
                                            className="rounded-circle"
                                            alt={user.name}
                                        />
                                        {user.name}
                                    </Box>
                                </TableCell>

                                <TableCell>{user.email}</TableCell>

                                <TableCell>
                                    <IconButton color="primary">
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton color="error" onClick={() => removeUser(user.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};