const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const secretKey = process.env.WhatIsYourName;

const vendorRegister = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  try {
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({ username, email, password: hashedPassword, confirmpassword: hashedPassword });

    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token, vendorId: vendor._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm');
    res.json({ vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.vendorId;
  try {
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ error: "Invalid vendor ID format" });
    }

    const vendor = await Vendor.findById(vendorId).populate('firm');
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const vendorFirmId = vendor.firm[0]?._id || null;
    res.status(200).json({ vendorId, vendorFirmId, vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };
