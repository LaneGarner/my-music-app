import { TextField, Grid, Button  } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import './Login.css'

export const Login = ({ user, password, handleNameInput, handlePasswordInput, handleLogin }) => {
    return (
        <form onSubmit={handleLogin}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center">
                <Box mt="50px">
                    <TextField value={user} onChange={handleNameInput} required className="Input-field" id="userName" label="Login" />
                </Box> 
                    <TextField type="password" value={password} onChange={handlePasswordInput} required className="Input-field" id="password" label="Password" />
                <Box m="20px">
                    <Button 
                        // onClick={handleLogin}
                        type="submit"
                        style={{ width:"25vw" }}
                        className="Login-button" 
                        variant="contained" 
                        color="primary">
                        Login
                    </Button>
                </Box>
            </Grid>
        </form>
    )
}