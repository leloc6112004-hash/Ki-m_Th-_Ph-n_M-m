package com.vnh.services.impl;

import com.vnh.repositories.StatsRepository;
import com.vnh.services.StatsServices;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatsServiceImpl implements StatsServices {
    
    @Autowired
    private StatsRepository statsRepository;

    @Override
    public List<Object[]> countPatientsByGender() {
        return this.statsRepository.countPatientsByGender();
    }

    @Override
    public List<Object[]> countPatientsByAgeGroup() {
        return this.statsRepository.countPatientsByAgeGroup();
    }

    @Override
    public List<Object[]> countPatientsBySpecialty() {
        return this.statsRepository.countPatientsBySpecialty();
    }

    @Override
    public List<Object[]> countServicesUsed() {
        return this.statsRepository.countServicesUsed();
    }

    @Override
    public List<Object[]> countPopularDiseases() {
        return this.statsRepository.countPopularDiseases();
    }

    @Override
    public List<Object[]> getRevenueByTime(String time, int year) {
        return this.statsRepository.getRevenueByTime(time, year);
    }
}