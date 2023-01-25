package com.project.lumos.company.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.lumos.company.dto.CompanyDTO;
import com.project.lumos.company.entity.Company;
import com.project.lumos.company.repository.CompanyRepository;
import com.project.lumos.order.service.OrderService;

@Service
public class CompanyService {

	private static final Logger log = LoggerFactory.getLogger(OrderService.class);
	private final CompanyRepository companyRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public CompanyService(CompanyRepository companyRepository, ModelMapper modelMapper) {
		this.companyRepository = companyRepository;
		this.modelMapper = modelMapper;
	}
	
	public Object selectCompanyInfo() {
		List<Company> companyInfo = companyRepository.findAll();
		return modelMapper.map(companyInfo, CompanyDTO.class);
	}

}