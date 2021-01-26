import { Grid, Card, CardContent, Typography, CardActions, CardActionArea, Switch, Slider, Select } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import { Notifications } from './Notifications'
import './Dashboard.css'

export const Dashboard = ({ user, quality, handleQuality, handleToggle, handleVolume, online, volume }) => {
    let alertBckgrnd 
    if (!online || volume > 80 || quality === "low") {
        alertBckgrnd = "tomato"
    }
    return (
        <>
            <Typography color="textSecondary" variant="h5">
                <Box mt="20px" ml="175px" mb="50px" fontWeight="fontWeightBold" fontSize="28px">
                Welcome {user}!
                </Box>
            </Typography>
            <Grid
                container
                spacing={7}
                direction="row"
                justify="center"
                alignItems="stretch"
                // alignContent="stretch"
                // align="center"
            >
            <Grid item>
                <Card className="Card-style">
                    <CardActionArea>
                        <CardContent>
                            <Typography>
                                <Box my="15px" fontSize="16px" fontWeight="fontWeightBold">
                                Online Mode
                                </Box>
                                Is this application connected to the internet?
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Switch checked={online}  onChange={handleToggle}/>
                    </CardActions>
                </Card>
                </Grid>
                <Grid item>
                <Card className="Card-style">
                    <CardActionArea>
                        <CardContent>
                            <Typography>
                                <Box my="15px" fontSize="16px" fontWeight="fontWeightBold">
                                Master Volume
                                </Box>
                                Overrides all other sound settings in this application
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Slider
                        value={volume}
                        onChange={handleVolume} 
                        step={10}
                        marks
                        min={0}
                        max={100}
                        />
                    </CardActions>
                </Card>
                </Grid>
                <Grid item>
                <Card className="Card-style">
                    <CardActionArea>
                        <CardContent>
                            <Typography>
                                <Box my="15px" fontSize="16px" fontWeight="fontWeightBold">
                                Sound Quality
                                </Box>
                                Manually control the music quality in event of poor connection
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Select onChange={handleQuality} defaultValue={quality}>
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                        </Select>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
            <Typography variant="h5">
                    {!online ? <div><Notifications/><Box bgcolor={alertBckgrnd} color="white" pl="30px" py="20px"><Typography>Your application is offline. You won't be able to share or stream music to other devices.</Typography></Box></div> : <div></div>}
                    {volume > 80 ? <div><Notifications/><Box bgcolor={alertBckgrnd} color="white" pl="30px" py="20px"><Typography>Listening to music at a high volume could cause long-term hearing loss.</Typography></Box></div> : <div></div>}
                    {quality === "low" ? <div><Notifications/><Box bgcolor={alertBckgrnd} color="white" pl="30px" py="20px"><Typography>Music quality is degraded. Increase quality if your connection allows it.</Typography></Box></div> : <div></div>}
            </Typography>
        </>
    )
}