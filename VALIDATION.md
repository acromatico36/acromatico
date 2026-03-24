# 🚀 ACROMATICO CRM - PRODUCTION VALIDATION

## 🔗 Production URLs

**Login**: https://acromatico.pages.dev/admin/crm/login  
**Twilio Webhook**: https://acromatico.pages.dev/api/crm/message-webhook

---

## 🧪 3 Validation Commands

### Admin Token
```bash
ADMIN_TOKEN="eyJ1c2VySWQiOiJpdGFsby1hZG1pbiIsImVtYWlsIjoiaXRhbG9AYWNyb21hdGljby5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE4MDU4NTA5OTM2ODR9"
```

### 1. Process Message Test
```bash
curl -X POST https://acromatico.pages.dev/api/crm/process-message \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client-joes-pizza",
    "projectId": "proj-joes-website",
    "source": "email",
    "content": "URGENT! Checkout completely broken. Lost 3 sales already!",
    "emailAddress": "joe@test.com"
  }'
```

**Expected**: `{"success": true, "message": {...classification...}, "taskCreated": true}`

### 2. List Tasks Test
```bash
curl https://acromatico.pages.dev/api/crm/tasks?status=open \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Expected**: Array of tasks with title, priority, effort

### 3. Analytics Dashboard Test
```bash
curl https://acromatico.pages.dev/api/crm/analytics/dashboard \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Expected**: `{"success": true, "data": {timeSaved: {...}, clientHealth: {...}}}`
