import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTourMutation } from "./toursApiSlice"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker'

const NewTourForm = ({usstates, mxstates, countries}) => {

    const [addNewTour, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTourMutation()

    const navigate = useNavigate()

    const [tourname, setTourName ] = useState("")
    const [country, setCountry ] = useState("us")
    const [availableStates, setAvailableStates ] = useState(usstates)
    const [selectedState, setSelectedState ] = useState("")
    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (isSuccess) {
            setTourName('')
            setCountry('')
            setAvailableStates(usstates)
            setSelectedState("")
            setStartDate(new Date())
            setEndDate(new Date())
            navigate('/home')
        }
    }, [isSuccess, navigate])

    const canSave = [tourname].every(Boolean) && !isLoading
    const errClass = isError ? "errmsg" : "offscreen"
    const disableStates = false

    const onSaveTourClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            console.log({country})
            await addNewTour({tourname, country, countryState: selectedState, startdate, enddate})
        }
    }

    const countryOptions = countries.map(country => {
        return (
            <option
                key={country.code}
                value={country.code}
            > {country.name}
            </option >
        )
    })

    const stateOptions = availableStates.map(st => {
        return (
            <option
                key={st.code}
                value={st.code}
            > {st.name}
            </option >
        )
    })

    console.log({stateOptions})

    const onTourNameChanged = (e) => {setTourName(e.target.value)}
    const onCountryChanged = (e) => {
        setCountry(e.target.value)
        switch (e.target.value) {
            case "US":
                setAvailableStates(usstates)
                break;
            case "MX":
                setAvailableStates(mxstates)
                break;
            default:
                setSelectedState("")
                disableStates=true
                break;
        }
    }

    const onStateChanged = (e) => {setSelectedState(e.target.value)}

        const content = 
            <>
            <Container>
                <p className={errClass}> {error?.data?.message}</p>

                <Form onSubmit={onSaveTourClicked}>

                <Form.Group className="mb-3">
                    <Form.Label>Tour Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter tour name"
                        name="tourname"
                        value={tourname}
                        onChange={onTourNameChanged}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Select 
                        aria-label="Select Country"
                        name="country"
                        // value="us"
                        defaultValue="US"
                        onChange={onCountryChanged}
                        >
                            {countryOptions}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>State/Province</Form.Label>
                    <Form.Select 
                        aria-label="Select State/Region"
                        name="selectedState"
                        // value="us"
                        defaultValue="US-NY"
                        onChange={onStateChanged}
                        disabled={disableStates}
                        >
                            {stateOptions}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tour Start Date</Form.Label>

                    <DateTimePicker
                        nativeInputAriaLabel="End date"
                        onChange={setStartDate}
                        name="startdate"
                        value={startdate}
                    />                
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tour End Date</Form.Label>

                    <DateTimePicker
                        nativeInputAriaLabel="End date"
                        onChange={setEndDate}
                        name="enddate"
                        value={enddate}
                    />                
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>

            </Container>
            </>

    return content 
}
export default NewTourForm