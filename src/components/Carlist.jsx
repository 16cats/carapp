import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";

export default function Carlist() {

    //state variables
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const columns = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCar(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ]

    //call getCars() function when rendering the component for the first time.
    useEffect(() => getCars(), [])

    //app is using carrestapi apoplciation which is deployed to heroku, address below
    const REST_URL = 'https://carrestapi.herokuapp.com/cars/';
    const getCars = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData " + responseData._embedded.cars)
                setCars(responseData._embedded.cars)
            })
            .catch(error => console.error(error));

    }

    const deleteCar = (params) => {
        console.log("params: " + params.data._links.car.href);
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

    return (
        <>
            <div className="ag-theme-material"
                style={{ height: '700px', width: '95%', margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={()=> setOpen(false)}
                    message={msg}>
                </Snackbar>
            </div>
        </>
    )
}
