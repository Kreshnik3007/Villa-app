import React, {useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";


function VillaForm({ villa, setUpdatedVilla}) {
    const [villaName, setVillaName] = useState('');
    const [ocupancy, setOcupancy] = useState(0);
    const [sqft, setSqft] = useState(0)
    const [shown, setShown] = useState(false);
    const [rate, setRate] = useState(0)
    const [details, setDetails] = useState('')


    const updateVillas = async (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Add Villa',
            text: 'Are u sure u want to add a Villa',
            icon: 'question',
            confirmButtonText: 'Add',
            showCloseButton: true,
        }).then(async (result) => {
            if(result.isConfirmed){
                const id_ = villa[villa.length - 1].id + 1;
                const response = await axios.post("https://localhost:7015/api/VillaApi/post", {
                    id: id_,
                    name: villaName,
                    ocupancy: ocupancy,
                    sqft: sqft,
                    rate: rate
                })
                setUpdatedVilla(response.data)
            }
        })

    }


    return (
        <>
            <div className='addButton'>
                <button className='btn btn-primary' onClick={() => setShown(!shown)}>Add a Villa</button>
            </div>
            {shown && <div>
                <form className='form1'>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Villa Name: </label>
                        <input type="text" className="form-control" id="exampleVillaName"
                               onChange={event => setVillaName(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Occupancy">Occupancy: </label>
                        <input type="number" className="form-control" id="occupancy"
                               onChange={event => setOcupancy(parseInt(event.target.value))}/>
                    </div>
                    <div className="form-group-sm">
                        <label htmlFor="Sqft">Square Feet: </label>
                        <input type="number" className="form-control" id="Sqft"
                               onChange={event => setSqft(parseInt(event.target.value))}/>
                    </div>
                    <div className="form-group-sm">
                        <label htmlFor="Rate">Rate: </label>
                        <input type="number" className="form-control" id="Rate"
                               onChange={event => setRate(parseInt(event.target.value))}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleVillaDetails">Villa Details: </label>
                        <input type="text" className="form-control" id="exampleVillaDetails"
                               onChange={event => setDetails(event.target.value)}/>
                    </div>
                    <div>
                        <button id='submitBtn' type="submit" className="btn btn-primary"
                                onClick={updateVillas}>Submit
                        </button>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default VillaForm;