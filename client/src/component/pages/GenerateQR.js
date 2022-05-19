import React, {useState, useRef, useEffect} from "react";
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
// import QrReader from 'react-qr-reader';
// import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';


function GenerateQR(){

    let history = useHistory();
    const { id } = useParams();
   
    const [text, setText] = useState('');   
    const [imageUrl, setImageUrl] = useState('');
    const classes = useStyles();

    useEffect(() => {
        generateQrCode();
    })

    const generateQrCode = async () => {
        try {
              const response = await QRCode.toDataURL("IT20132200");
              setImageUrl(response);
        }catch (error) {
          console.log(error);
        }
      }

    return(
        <form>
        <Container  className={classes.Container}>
            <Card>
                <CardContent id="attendance_form">
                    <br/>
                    <Grid >
                        
                    <center><Grid >
                    <h2>Movie Ticket</h2><br/>
                    {/* Enter User ID :<br/><br/>
                    <TextField label="Enter UserID Here" onChange={(e) => setText(e.target.value)}/><br/><br/>
                    <Button className={classes.btn} color="primary" variant="contained" onClick={() => generateQrCode()}>Generate</Button>&nbsp;&nbsp;  */}
                    
                    <br/>
                    {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img style={{height: "300px", width: "300px"}} src={imageUrl} alt="img"/>
                              </a>) : null}
                    </Grid></center>
                    </Grid>
                    <center><Link to={`/employeeManagement`}><Button className={classes.btn} color="primary" variant="contained" >Back</Button></Link></center>
                </CardContent>
            </Card>
        </Container>
        </form>
    )
}

const useStyles = makeStyles((theme) => ({
    Container: {
        marginTop: 60,
        marginRight: 140
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
     
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));
export default GenerateQR;