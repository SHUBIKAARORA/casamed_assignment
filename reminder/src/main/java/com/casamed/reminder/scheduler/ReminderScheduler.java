package com.casamed.reminder.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ReminderScheduler {
    private final String NODE_API_URL = "http://localhost:5000/api/reminders/trigger";

    @Scheduled(fixedRate = 60000) // every 60 seconds
    public void triggerReminderJob() {
        try {
            RestTemplate restTemplate = new RestTemplate();

            String response = restTemplate.postForObject(
                    NODE_API_URL,
                    null,
                    String.class
            );

            System.out.println("Reminder job triggered successfully: " + response);

        } catch (Exception e) {
            System.out.println("Error triggering reminder job: " + e.getMessage());
        }
    }
}
