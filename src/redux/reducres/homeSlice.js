import { createSlice } from "@reduxjs/toolkit";
import Colors from "../../common/colors";
import icons from "../../common/icons";
const homeSlice = createSlice({
  name: "home",
  initialState: {
    modalVisible: false,
    createGroupModalVisible: false,
    groupName: "",
    selectedColor: Colors.DEFAULT,
    selectedIcon: icons.TOC,
    selectedView: "",
    iconPickerVisible: false,
    colorPickerVisible: false
  },
  reducers: {
    toggleModal: (state) => {
      state.modalVisible = !state.modalVisible;
    },
    toggleCreateGroupModal: (state) => {
      state.createGroupModalVisible = !state.createGroupModalVisible;
    },
    setGroupName: (state, action) => {
      state.groupName = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedIcon: (state, action) => {
      state.selectedIcon = action.payload;
    },
    setSelectedView: (state, action) => {
      state.selectedView = action.payload;
    },
    setIconPickerVisible: (state, action) => {
      state.iconPickerVisible = action.payload;
    },
    setColorPickerVisible: (state, action) => {
      state.colorPickerVisible = action.payload;
    }
  }
});
export const {
  toggleModal,
  toggleCreateGroupModal,
  setGroupName,
  setSelectedColor,
  setSelectedIcon,
  setSelectedView,
  setIconPickerVisible,
  setColorPickerVisible
} = homeSlice.actions;
export default homeSlice.reducer;
