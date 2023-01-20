package com.project.lumos.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.company.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer>{

}