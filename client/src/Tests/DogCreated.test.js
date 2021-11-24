// import React from "react";
// import { configure, shallow, mount } from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import{DogCreated} from'../components/DogCreated/DogCreated';
// //import { postDogs } from "../actions/index";
// //import configureStore from "redux-mock-store";
// import '@testing-library/jest-dom'
// configure({ adapter: new Adapter() });

// describe('<DogCreated/>',()=>{
//     describe('Structure',()=>{
//         let wrapper;
//         beforeEach(()=>{
//             wrapper=shallow(<DogCreated/>)
//         });
//          it("Renderiza un <form>", () => {
//             expect(wrapper.find("form")).toHaveLength(1);
//           }); 
//           it('Renderiza un input con la propiedad "name" igual a "title"', () => {
//             expect(wrapper.find('input[name="name"]')).toHaveLength(1);
//           });
//     })
// })