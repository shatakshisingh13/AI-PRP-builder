package com.prdbuilder.dto;

import lombok.Data;
import java.util.List;

@Data
public class Persona {
    private String name;
    private String description;
    private String goal;
    private List<String> painPoints;
}
