import {Container, Card, Form, Button} from 'react-bootstrap'
import CustomFormSelect from '../../components/CustomFormSelect';
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {number, object, string, array} from 'yup'

function Survey() {
    const planes = ['A220', 'A320', 'A330', 'A340', 'A350', 'A380', 'B737', 'B747', 'B757', 'B767', 'B777', 'B787'];
    const airlines = ['American Airlines', 'United Airlines', 'Delta Airlines', 'Frontier Airlines', 'Spirit Airlines', 'Alaska Air', 'Southwest Airlines', 'Jetblue Airlines'];

    const sectionStyle = 'w-full my-[3%] pt-[2%] pb-[3%] bg-olivine flex flex-col items-center rounded-xl';
    const labelStyle = 'block mb-0.5 text-md font-semibold';
    const rowStyle = 'w-11/12 m-[1%] grid grid-flow-col';
    const inputStyle = 'w-full px-2 h-3/5 rounded-lg';

    const schema = object().shape({
        firstName: string().required(1, 'must be at least 1 character long'),
        lastName: string().required(1, 'must be at least 1 character long'),
        email: string().required().email('must be a valid email'),
        age: number().required().positive().integer().min(18, 'must be at least 18'),
        manufacturer: string().required('must select one'),
        airplane: string().required('must select one option'),
        airlines: array().min(1, 'must select one'),
        response: string().required(1, 'must be at least 1 character long')
    });

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = (data) => console.log(data);

    return (
        <>
            <Container className='min-w-screen min-h-max h-fit bg-zinc-200 flex justify-center items-center text-black'>
                <Card className='min-w-3/5 w-3/5 h-auto bg-white rounded-3xl my-[5%] flex justify-center items-center'>
                    <Card.Body className='w-5/6 py-[5%]'>
                        <Container className='w-full text-center pb-[3%]'>
                            <Card.Title className='text-3xl mb-1'>Plane Survey</Card.Title>
                            <Card.Subtitle className='text-xs'>Please fill out the fields below with the required information</Card.Subtitle>
                        </Container>
                        <Form noValidate className='w-full flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                            <Container className={sectionStyle + ' pb-[5.5%] gap-y-3'}>
                                <Container className='w-11/12 m-[1%] flex justify-between'>
                                    <Form.Group className='w-[48%]'>
                                        <Form.Label className={labelStyle}>First Name</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name='firstName'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control
                                                    placeholder='Chuck'
                                                    className={inputStyle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                    isInvalid={errors.firstName}
                                                />
                                            )}
                                        />
                                    </Form.Group>
                                    <Form.Group className='w-[48%]'>
                                        <Form.Label className={labelStyle}>Last Name</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name='lastName'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control 
                                                    placeholder='Yeager'
                                                    className={inputStyle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                    </Form.Group>
                                </Container>
                                <Container className='w-11/12 m-[1%] flex justify-between'>
                                    <Form.Group className='w-[80%]'>
                                        <Form.Label className={labelStyle}>Email</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name='email'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control 
                                                    type='email'
                                                    placeholder='cyeager1947@example.com'
                                                    className={inputStyle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                    </Form.Group>
                                    <Form.Group className='w-2/12'>
                                        <Form.Label className={labelStyle}>Age</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name='age'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control 
                                                    type='number'
                                                    placeholder='18'
                                                    className={inputStyle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                    </Form.Group>
                                </Container>
                            </Container>
                            <Container className={sectionStyle}>
                                <Container className={rowStyle}>
                                    <Form.Group>
                                        <Form.Label className={labelStyle}>Airbus or Boeing?</Form.Label>
                                        <Controller
                                            control={control}
                                            name='manufacturer'
                                            defaultValue=''
                                            render={({field: {onChange, value}}) => (
                                                <>
                                                    <Form.Check 
                                                        type='radio'
                                                        id='airbus'
                                                        name='manufacturer'
                                                        label={<span className='ml-1.5'>Airbus</span>}
                                                        className='flex items-center'
                                                        value='airbus'
                                                        checked={value === 'airbus'}
                                                        onChange={e => onChange(e.target.value)}
                                                    />
                                                    <Form.Check 
                                                        type='radio'
                                                        id='boeing'
                                                        name='manufacturer'
                                                        label={<span className='ml-1.5'>Boeing</span>}
                                                        className='flex items-center'
                                                        value='boeing'
                                                        checked={value === 'boeing'}
                                                        onChange={e => onChange(e.target.value)}
                                                    />
                                                </>

                                            )}
                                        >
                                        </Controller>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={labelStyle}>Favorite Airplane</Form.Label>
                                        <Controller
                                            control={control}
                                            name='airplane'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, ref}}) => (
                                                <CustomFormSelect 
                                                    options={planes} 
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                    </Form.Group>
                                </Container>
                            </Container>
                            <Container className={sectionStyle}>
                                <Form.Group className='w-11/12'>
                                    <Form.Label className={labelStyle}>Best US Airlines</Form.Label>
                                    <Controller 
                                            control={control} 
                                            name='airlines'
                                            defaultValue={new Set()}
                                            render={({field: {onChange, value}}) => (
                                                airlines.map(airline => (
                                                    <Form.Check 
                                                        type='checkbox'
                                                        key={`${airline}`}
                                                        label={<span className='ml-1.5'>{airline}</span>}
                                                        className='flex items-center'
                                                        onChange={e => {
                                                            const updatedAirlines = new Set(value);

                                                            if (e.target.checked) {
                                                                updatedAirlines.add(airline);
                                                            } else {
                                                                updatedAirlines.delete(airline);
                                                            }
                                                            onChange(updatedAirlines)
                                                        }}
                                                        checked={value.has(airline)}
                                                    />
                                                ))
                                            )}
                                        >
                                        </Controller>
                                </Form.Group>
                            </Container>
                            <Container className={sectionStyle}>
                                <Form.Group className='w-11/12'>
                                    <Form.Label className={labelStyle}>Tell us about your experience with aviation!</Form.Label>
                                    <Controller 
                                            control={control} 
                                            name='response'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control 
                                                    as='textarea'
                                                    rows={3}
                                                    cols={200}
                                                    className='w-full min-h-[8ch] max-h-[20ch] px-2 pt-1 mt-[1%] rounded-lg'
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                </Form.Group>
                            </Container>
                            <Container className='w-full h-full mt-[3%]'>
                                <Button className='w-1/4 py-[1%] mx-auto flex justify-center items-center bg-buff text-center rounded-lg text-white' type='submit' variant='primary'>Submit</Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Survey;

