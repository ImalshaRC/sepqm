import React, {useState, useRef, useEffect} from "react";
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
// import QrReader from 'react-qr-reader';
// import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


function GenerateQR(){

    let docToPrint = React.createRef();

    const printDocument = () => {
        const input = docToPrint.current;
        html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [400, 400]
        });
            pdf.addImage(imgData, "JPEG", 0, 0);
            pdf.save(movieName + "_QR_Ticket.pdf");
        });
    };

    const { token } = useParams();

    const [movieName, setMovieName] = useState();
    const [theatre, setTheatre] = useState();
    const [noOfTicket, setNoOfTicket] = useState();
    const [amount, setAmount] = useState();

    useEffect(()=>{
        loadTicket();
    },[])

    const loadTicket =() =>{
        axios.get("http://localhost:5000/payment/findCart/" + token).then((res) => {
            loadCartData(res.data.data.cartID);
            setNoOfTicket(res.data.data.noOfTicket);
            setAmount(res.data.data.amount);
        })
    }

    const loadCartData =(id) =>{
        axios.get("http://localhost:5000/cart/get/" + id).then((res) => {
            // console.log(res.data);
            setMovieName(res.data.name);
            setTheatre(res.data.theatre);
        })
    }
    
    
   
    const [text, setText] = useState('');   
    const [imageUrl, setImageUrl] = useState('');
    const classes = useStyles();

    useEffect(() => {
        generateQrCode();
    })

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(token);
            setImageUrl(response);
        }catch (error) {
          console.log(error);
        }
      }

    return(
        <form>
        <Container style={{ maxWidth: 600 }}><div ref={docToPrint}>
            <Card>
                <CardContent id="attendance_form">
                    <Grid >
                        
                    <center><Grid >
                    <h2>Movie Ticket</h2>
                    {/* Enter User ID :<br/><br/>
                    <TextField label="Enter UserID Here" onChange={(e) => setText(e.target.value)}/><br/><br/>
                    <Button className={classes.btn} color="primary" variant="contained" onClick={() => generateQrCode()}>Generate</Button>&nbsp;&nbsp;  */}
                    
                    
                    {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img style={{height: "300px", width: "300px"}} src={imageUrl} alt="img"/>
                              </a>) : null}
                    </Grid></center>
                    </Grid>
                    
                </CardContent>

                <CardContent>
                    <center><Card className="">
                        <div className="mb-4" style={{ textAlign: "left", marginLeft: '32%' }}>
                            <h6><b>Movie Name:</b> {movieName}</h6>
                            <h6><b>Theatre:</b> {theatre}</h6>
                            <h6><b>No Of Tickets:</b> {noOfTicket}</h6>
                            <h6><b>Full Amount:</b> {amount}</h6>
                        </div>
                        <center>
                            <Button className={classes.btn} onClick={printDocument} color="primary" variant="contained" >Download</Button>                            
                        </center>
                    </Card></center>
                </CardContent>
            </Card></div>
        </Container>
        </form>
    )
}

const useStyles = makeStyles((theme) => ({
    Container: {
        marginTop: 10,
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