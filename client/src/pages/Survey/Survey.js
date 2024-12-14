import { Container, Card, Form, Button } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup' 
import { number, object, string, array } from 'yup'
import Select from 'react-select';
import ErrorMessage from '../../components/ErrorMessage';

function Survey() {
    const planes = [
        {value: 'a220', label: 'A220'},
        {value: 'a320', label: 'A230'},
        {value: 'a330', label: 'A330'},
        {value: 'a340', label: 'A340'},
        {value: 'a350', label: 'A350'},
        {value: 'a380', label: 'A380'},
        {value: 'b737', label: 'B737'},
        {value: 'b747', label: 'B747'},
        {value: 'b757', label: 'B757'},
        {value: 'b767', label: 'B767'},
        {value: 'b777', label: 'B777'},
        {value: 'b787', label: 'B787'}
    ]
    const airlines = ['American Airlines', 'United Airlines', 'Delta Airlines', 'Frontier Airlines', 'Spirit Airlines', 'Alaska Air', 'Southwest Airlines', 'Jetblue Airlines'];

    const sectionStyle = 'w-full my-[3%] pt-[2%] pb-[3%] bg-olivine flex flex-col items-center rounded-xl';
    const labelStyle = 'block mb-0.5 text-md font-semibold';
    const rowStyle = 'w-11/12 m-[1%] grid grid-flow-col';
    const inputStyle = 'w-full px-2 h-1/2 rounded-lg text-xs lg:text-base';
    const inputErrorStyle = inputStyle + ' outline-red-600 outline outline-2' 
    const optionErrorStyle = 'outline-red-600 outline outline-2'
    const errorStyle = 'w-full h-3 text-red-600 text-[0.5em] lg:text-xs pt-0.2 lg:pt-0.5'

    const schema = object().shape({
        firstName: string().required('empty field').min(1, 'must be at least 1'),
        lastName: string().required('empty field').min(1, 'must be at least 1'),
        email: string().required('empty field').email('must be a valid email'),
        age: number().typeError('must be a number').required('empty field').positive().integer('must be a integer').min(18, 'must be at least 18'),
        manufacturer: string().required('must select one'),
        airplane: object().shape({
            value: string(),
            label: string()
        }).required('must pick one'),
        airlines: array().min(1, 'must select at least one'),
        response: string().required('empty field').min(1, 'must be at least 1')
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
                <Card className='min-w-3/5 w-4/5 lg:w-3/5 h-auto bg-white rounded-3xl my-[5%] flex justify-center items-center'>
                    <Card.Body className='w-5/6 py-[5%]'>
                        <Container className='w-full text-center pb-[3%]'>
                            <Card.Title className='text-3xl mb-1 lg:text-4xl'>Plane Survey</Card.Title>
                            <Card.Subtitle className='text-xs'>Please fill out the fields below with the required information</Card.Subtitle>
                        </Container>
                        <Form noValidate className='w-full flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                            <Container className={sectionStyle}>
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
                                                    className={errors.firstName ? inputErrorStyle : inputStyle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        />
                                        <ErrorMessage error={errors.firstName} style={errorStyle}/>
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
                                                    className={errors.lastName ? inputErrorStyle : inputStyle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        />
                                        <ErrorMessage error={errors.lastName} style={errorStyle}/>
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
                                                    className={errors.email ? inputErrorStyle : inputStyle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.email}  style={errorStyle} />
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
                                                    min='18'
                                                    max='125'
                                                    className={errors.age ? inputErrorStyle : inputStyle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.age} style={errorStyle}/>
                                    </Form.Group>
                                </Container>
                            </Container>
                            <Container className={sectionStyle + ' pt-[3%]'}>
                                <Container className={rowStyle}>
                                    <Form.Group className='w-full'>
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
                                        <ErrorMessage error={errors.manufacturer} style={errorStyle} />
                                    </Form.Group>
                                    <Form.Group className='w-full'>
                                        <Form.Label className={labelStyle}>Favorite Airplane</Form.Label>
                                        <Controller
                                            control={control}
                                            name="airplane"
                                            defaultValue={null}
                                            render={({field: {onChange, value, ref}}) => (
                                                <Select
                                                    inputRef={ref}
                                                    options={planes}
                                                    value={value}
                                                    onChange={(selectedOption) => onChange(selectedOption)}
                                                    placeholder='(select one)'
                                                />
                                            )}
                                        />
                                        <ErrorMessage error={errors.airplane} style={errorStyle} />
                                        </Form.Group>
                                </Container>
                            </Container>
                            <Container className={sectionStyle + ' pt-[4%]'}>
                                <Form.Group className='w-11/12'>
                                    <Form.Label className={labelStyle}>Best US Airlines</Form.Label>
                                    <Controller 
                                            control={control} 
                                            name='airlines'
                                            defaultValue={[]}
                                            render={({field: {onChange, value}}) => (
                                                airlines.map(airline => (
                                                    <Form.Check 
                                                        type='checkbox'
                                                        key={`${airline}`}
                                                        label={<span className='ml-1.5'>{airline}</span>}
                                                        className='flex items-center'
                                                        onChange={e => {
                                                            let updatedAirlines = [...value];

                                                            if (e.target.checked) {
                                                                updatedAirlines.push(airline);
                                                            } else {
                                                                updatedAirlines = updatedAirlines.filter(a => airline !== a)
                                                            }
                                                            onChange(updatedAirlines)
                                                        }}
                                                        checked={value.includes(airline)}
                                                    />
                                                ))
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.airlines} style={errorStyle}/>
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
                                                    className={'w-full min-h-[8ch] max-h-[20ch] px-2 pt-1 mt-[1%] rounded-lg block' + ((errors.response) ? ' outline-red-600 outline outline-2' : '')}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.response}  style={errorStyle} className='mt-[-5px]' />
                                </Form.Group>
                            </Container>
                            <Container className='w-full h-full mt-[3%]'>
                                <Button className='w-1/2 lg:w-1/4 py-[1%] mx-auto flex justify-center items-center bg-buff text-center rounded-lg text-white' type='submit' variant='primary'>Submit</Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Survey;

