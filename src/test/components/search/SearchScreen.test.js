import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../Components/search/SearchScreen";

const mockNavigate = jest.fn()

jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=> mockNavigate,
}))

describe('test en <SearchScreen/>', () => {

    test('debe mostrase correctamente con valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        )
        // console.log(wrapper.html())
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe')
    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        )
        // console.log('=========>',wrapper.html())
        expect(wrapper.find('input').prop('value')).toBe('batman')
    });

    test('Debe de mostrar un error si no se encuntra un heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batiman123']}>
                <SearchScreen />
            </MemoryRouter>
        )
        // console.log('veamos que pedo????',wrapper.html())
        expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados: batiman123')
    });

    test('debe de llamar el navigate a la nueva pantalla', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        )
        wrapper.find('input').simulate('change', {
            target: {
                name:'searchText',
                value:'batman'
            }
        })
        wrapper.find('form').prop('onSubmit')({
            preventDefault:()=>{}
        })
        expect(mockNavigate).toHaveBeenCalledWith('?q=batman')
    });
});

