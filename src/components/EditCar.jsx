import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCar(props) {

    //state
    //car instead of cars, as we are just going to add one car and not control all the cars
    const [car, setCar] = useState({ brand: '', model: '' });
    const [open, setOpen] = useState(false); //is dialog open?

    //functions
    const handleClose = (event, reason) =>{
        if (reason != 'backdropClick')
            setOpen(false);
    }

    const handleSave = () => {
        props.addCar(car); //päivitä tilamuuttuja car
        //update car

        setOpen(false); //close dialog
    }

    const handleInputChanged = (event) =>{
        setCar({...car, [event.target.name]: event.target.value});
    }

    //return
    //add button
    //dialog (add form)
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Brand'
                        name='brand'
                        value={car.brand}
                        onChange={handleInputChanged}>
                    </TextField>
                    <TextField
                        label='Model'
                        name='model'
                        value={car.model}
                        onChange={handleInputChanged}>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}