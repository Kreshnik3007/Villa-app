import React, {useState} from 'react';
import axios from "axios";


function VillaForm({villa}) {
    const [villaName, setVillaName] = useState('');
    const [ocupancy, setOcupancy] = useState(0);
    const [sqft, setSqft] = useState(0)
    const [shown, setShown] = useState(false);
    const [rate, setRate] = useState(0)

    const updateVillas = async (e) => {
        e.preventDefault()
        const id_ = villa[villa.length - 1].id + 1;
        await axios.post("https://localhost:7015/api/VillaApi/post", {
            id: id_,
            name: villaName,
            ocupancy: ocupancy,
            sqft: sqft,
            rate: rate
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