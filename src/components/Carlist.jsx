import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

const Carlist = () => {
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const columns = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        {
            cellRenderer: params =>
                <EditCar parms={params} car={params.data} updateCar={updateCar} />,
            width: 120
        },
        {
            cellRenderer: params => (
                <Button size="small" color="error" onClick={() => deleteCar(params)}>
                    Delete
                </Button>
            ),
            width: 120
        }
    ];

    useEffect(() => getCars(), []);

    const REST_URL = 'https://carrestapi.herokuapp.com/cars/';

    const getCars = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setCars(responseData._embedded.cars);
            })
            .catch(error => console.error(error));
    }

    const updateCar = (car, link) => {
        fetch(link,  {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    getCars();
                    setMsg('Saved successfully')
                    setOpen(true)
                } else {
                    console.log(JSON.stringify(car));
                    alert('Something went wrong')
                }
            })
            .catch(error => console.log(error))
    }

    const deleteCar = (params) => {
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Car is deleted successfully!');
                    setOpen(true);
                    getCars();
                } else {
                    alert('Something went wrong');
                }
            })
            .catch(error => console.error(error));
    }

    const addCar = (car) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    getCars();
                } else {
                    alert('Something went wrong while adding a new car');
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{ height: '700px', width: '95%', margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>
            {selectedCar && (
                <EditCar carData={selectedCar} updateCar={updateCar} />
            )}
        </>
    )
}

export default Carlist;
