import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Collapse, Divider, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore, Delete, Edit, PowerSettingsNew, PowerOff } from '@mui/icons-material';

const MenuManager = () => {
  const [menus, setMenus] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [currentMenuIndex, setCurrentMenuIndex] = useState(null);
  const [currentSubmenuIndex, setCurrentSubmenuIndex] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [itemDetails, setItemDetails] = useState({ name: '', price: '', variants: [], addons: [], status: 'active' });
  const [openDropdown, setOpenDropdown] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdown(prevState => ({ ...prevState, [key]: !prevState[key] }));
  };

  const handleAddMenu = () => {
    setMenus([...menus, { name: newMenuName, items: [], submenus: [], status: 'active' }]);
    setNewMenuName('');
    setOpenDialog(false);
  };

  const handleEditMenuName = (index) => {
    const newName = prompt('Enter new menu name', menus[index].name);
    if (newName) {
      const updatedMenus = [...menus];
      updatedMenus[index].name = newName;
      setMenus(updatedMenus);
    }
  };

  const handleEditSubmenuName = (menuIndex, submenuIndex) => {
    const newName = prompt('Enter new submenu name', menus[menuIndex].submenus[submenuIndex].name);
    if (newName) {
      const updatedMenus = [...menus];
      updatedMenus[menuIndex].submenus[submenuIndex].name = newName;
      setMenus(updatedMenus);
    }
  };

  const handleAddItem = () => {
    setItemDetails({ name: '', price: '', variants: [], addons: [], status: 'active' });
    setItemDialogOpen(true);
  };

  const handleSaveItem = () => {
    const updatedMenus = [...menus];
    if (currentSubmenuIndex === null) {
      updatedMenus[currentMenuIndex].items.push(itemDetails);
    } else {
      updatedMenus[currentMenuIndex].submenus[currentSubmenuIndex].items.push(itemDetails);
    }
    setMenus(updatedMenus);
    setItemDialogOpen(false);
  };

  const handleEditItem = (index) => {
    const item = (currentSubmenuIndex === null
      ? menus[currentMenuIndex].items[index]
      : menus[currentMenuIndex].submenus[currentSubmenuIndex].items[index]);
    setItemDetails(item);
    setSelectedItemIndex(index);
    setItemDialogOpen(true);
  };

  const handleAddSubmenu = () => {
    const submenuName = prompt('Enter submenu name');
    if (submenuName) {
      const updatedMenus = [...menus];
      updatedMenus[currentMenuIndex].submenus.push({ name: submenuName, items: [], status: 'active' });
      setMenus(updatedMenus);
    }
  };

  const handleSelectMenu = (menuIndex) => {
    setCurrentMenuIndex(menuIndex);
    setCurrentSubmenuIndex(null);
    setSelectedItemIndex(null);
    toggleDropdown(menuIndex);
  };

  const handleSelectSubmenu = (menuIndex, submenuIndex) => {
    setCurrentMenuIndex(menuIndex);
    setCurrentSubmenuIndex(submenuIndex);
    setSelectedItemIndex(null);
    toggleDropdown(`${menuIndex}-${submenuIndex}`);
  };

  const handleRemoveItem = (index) => {
    const updatedMenus = [...menus];
    if (currentSubmenuIndex === null) {
      updatedMenus[currentMenuIndex].items.splice(index, 1);
    } else {
      updatedMenus[currentMenuIndex].submenus[currentSubmenuIndex].items.splice(index, 1);
    }
    setMenus(updatedMenus);
    setSelectedItemIndex(null);
  };

  const handleRemoveMenu = (index) => {
    const updatedMenus = [...menus];
    updatedMenus.splice(index, 1);
    setMenus(updatedMenus);
    if (currentMenuIndex === index) {
      setCurrentMenuIndex(null);
    }
  };

  const handleRemoveSubmenu = (menuIndex, submenuIndex) => {
    const updatedMenus = [...menus];
    updatedMenus[menuIndex].submenus.splice(submenuIndex, 1);
    setMenus(updatedMenus);
    if (currentSubmenuIndex === submenuIndex) {
      setCurrentSubmenuIndex(null);
    }
  };

  const handleToggleMenuStatus = (index) => {
    const updatedMenus = [...menus];
    updatedMenus[index].status = updatedMenus[index].status === 'active' ? 'inactive' : 'active';
    setMenus(updatedMenus);
  };

  const handleToggleSubmenuStatus = (menuIndex, submenuIndex) => {
    const updatedMenus = [...menus];
    const submenu = updatedMenus[menuIndex].submenus[submenuIndex];
    submenu.status = submenu.status === 'active' ? 'inactive' : 'active';
    setMenus(updatedMenus);
  };

  const handleVariantChange = (index, value) => {
    const variants = [...itemDetails.variants];
    variants[index] = value;
    setItemDetails({ ...itemDetails, variants });
  };

  const handleAddVariant = () => {
    setItemDetails({ ...itemDetails, variants: [...itemDetails.variants, { name: '', price: '' }] });
  };

  const handleRemoveVariant = (index) => {
    const variants = [...itemDetails.variants];
    variants.splice(index, 1);
    setItemDetails({ ...itemDetails, variants });
  };

  const handleAddonChange = (index, value) => {
    const addons = [...itemDetails.addons];
    addons[index] = value;
    setItemDetails({ ...itemDetails, addons });
  };

  const handleAddAddon = () => {
    setItemDetails({ ...itemDetails, addons: [...itemDetails.addons, ''] });
  };

  const handleRemoveAddon = (index) => {
    const addons = [...itemDetails.addons];
    addons.splice(index, 1);
    setItemDetails({ ...itemDetails, addons });
  };

  const toggleItemStatus = () => {
    setItemDetails({ ...itemDetails, status: itemDetails.status === 'active' ? 'inactive' : 'active' });
  };

  useEffect(() => {
    console.log("menus = >", menus);
  }, [menus, itemDetails]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', padding: '10px' }}>
        <Button variant="contained" color="primary" fullWidth onClick={() => setOpenDialog(true)}>
          Add New Menu
        </Button>
        <List>
          {menus.map((menu, menuIndex) => (
            <React.Fragment key={menuIndex}>
              <ListItem button onClick={() => handleSelectMenu(menuIndex)}>
                <ListItemText primary={menu.name} />
                <IconButton onClick={() => handleEditMenuName(menuIndex)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleToggleMenuStatus(menuIndex)} color="primary">
                  {menu.status === 'active' ? <PowerSettingsNew /> : <PowerOff />}
                </IconButton>
                <IconButton onClick={() => handleRemoveMenu(menuIndex)} color="secondary">
                  <Delete />
                </IconButton>
                {openDropdown[menuIndex] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openDropdown[menuIndex]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.items.map((item, index) => (
                    <ListItem button style={{ paddingLeft: '20px' }} key={index}>
                      <ListItemText primary={item.name} />
                      <IconButton onClick={() => handleEditItem(index)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveItem(index)} color="secondary">
                        <Delete />
                      </IconButton>
                      <IconButton onClick={toggleItemStatus} color="primary">
                        {item.status === 'active' ? <PowerSettingsNew /> : <PowerOff />}
                      </IconButton>
                    </ListItem>
                  ))}
                  {menu.submenus.map((submenu, submenuIndex) => (
                    <React.Fragment key={submenuIndex}>
                      <ListItem button style={{ paddingLeft: '20px' }} onClick={() => handleSelectSubmenu(menuIndex, submenuIndex)}>
                        <ListItemText primary={submenu.name} />
                        <IconButton onClick={() => handleEditSubmenuName(menuIndex, submenuIndex)} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleToggleSubmenuStatus(menuIndex, submenuIndex)} color="primary">
                          {submenu.status === 'active' ? <PowerSettingsNew /> : <PowerOff />}
                        </IconButton>
                        <IconButton onClick={() => handleRemoveSubmenu(menuIndex, submenuIndex)} color="secondary">
                          <Delete />
                        </IconButton>
                        {openDropdown[`${menuIndex}-${submenuIndex}`] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={openDropdown[`${menuIndex}-${submenuIndex}`]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {submenu.items.map((item, index) => (
                            <ListItem button style={{ paddingLeft: '40px' }} key={index}>
                              <ListItemText primary={item.name} />
                              <IconButton onClick={() => handleEditItem(index)} color="primary">
                                <Edit />
                              </IconButton>
                              <IconButton onClick={() => handleRemoveItem(index)} color="secondary">
                                <Delete />
                              </IconButton>
                              <IconButton onClick={toggleItemStatus} color="primary">
                                {item.status === 'active' ? <PowerSettingsNew /> : <PowerOff />}
                              </IconButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  ))}
                </List>
                <Button onClick={handleAddItem}>Add Item</Button>
                <Button onClick={handleAddSubmenu}>Add Submenu</Button>
              </Collapse>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
      <div style={{ width: '80%', padding: '10px' }}>
        {currentMenuIndex !== null && currentSubmenuIndex === null && (
          <div>
            <h2>Menu: {menus[currentMenuIndex].name}</h2>
          </div>
        )}
        {currentSubmenuIndex !== null && (
          <div>
            <h2>Submenu: {menus[currentMenuIndex].submenus[currentSubmenuIndex].name}</h2>
          </div>
        )}
        {selectedItemIndex !== null && (
          <div>
            <h2>Item Details</h2>
            <TextField
              label="Item Name"
              value={itemDetails.name}
              onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Price"
              value={itemDetails.price}
              onChange={(e) => setItemDetails({ ...itemDetails, price: e.target.value })}
              fullWidth
            />
            <h3>Variants</h3>
            {itemDetails.variants.map((variant, index) => (
              <div key={index}>
                <TextField
                  label={`Variant Name ${index + 1}`}
                  value={variant.name}
                  onChange={(e) => handleVariantChange(index, { ...variant, name: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Price"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, { ...variant, price: e.target.value })}
                  fullWidth
                />
                <Button onClick={() => handleRemoveVariant(index)} color="secondary">Remove Variant</Button>
              </div>
            ))}
            <Button onClick={handleAddVariant}>Add Variant</Button>
            <h3>Addons</h3>
            {itemDetails.addons.map((addon, index) => (
              <div key={index}>
                <TextField
                  label={`Addon ${index + 1}`}
                  value={addon}
                  onChange={(e) => handleAddonChange(index, e.target.value)}
                  fullWidth
                />
                <Button onClick={() => handleRemoveAddon(index)} color="secondary">Remove Addon</Button>
              </div>
            ))}
            <Button onClick={handleAddAddon}>Add Addon</Button>
          </div>
        )}
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Menu Name"
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMenu} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={itemDialogOpen} onClose={() => setItemDialogOpen(false)}>
        <DialogTitle>{selectedItemIndex === null ? 'Add Item' : 'Edit Item'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            value={itemDetails.name}
            onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Price"
            value={itemDetails.price}
            onChange={(e) => setItemDetails({ ...itemDetails, price: e.target.value })}
            fullWidth
          />
          <h3>Variants</h3>
          {itemDetails.variants.map((variant, index) => (
            <div key={index}>
              <TextField
                label={`Variant Name ${index + 1}`}
                value={variant.name}
                onChange={(e) => handleVariantChange(index, { ...variant, name: e.target.value })}
                fullWidth
              />
              <TextField
                label="Price"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, { ...variant, price: e.target.value })}
                fullWidth
              />
              <Button onClick={() => handleRemoveVariant(index)} color="secondary">Remove Variant</Button>
            </div>
          ))}
          <Button onClick={handleAddVariant}>Add Variant</Button>
          <h3>Addons</h3>
          {itemDetails.addons.map((addon, index) => (
            <div key={index}>
              <TextField
                label={`Addon ${index + 1}`}
                value={addon}
                onChange={(e) => handleAddonChange(index, e.target.value)}
                fullWidth
              />
              <Button onClick={() => handleRemoveAddon(index)} color="secondary">Remove Addon</Button>
            </div>
          ))}
          <Button onClick={handleAddAddon}>Add Addon</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MenuManager;
