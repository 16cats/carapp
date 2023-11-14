import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

const AddCar = (props) => {
    const [car, setCar] = useState({ brand: '', model: '' });
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    }

    const handleSave = () => {
        props.addCar(car);
        setOpen(false);
    }

    const handleInputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>New car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Brand'
                        name='brand'
                        value={car.brand}
                        onChange={handleInputChanged}
                    />
                    <TextField
                        label='Model'
                        name='model'
                        value={car.model}
                        onChange={handleInputChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCar;