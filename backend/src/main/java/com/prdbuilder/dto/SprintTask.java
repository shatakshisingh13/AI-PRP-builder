package com.prdbuilder.dto;

import lombok.Data;
import java.util.List;

@Data
public class SprintTask {
    private String week;
    private List<String> tasks;
}
